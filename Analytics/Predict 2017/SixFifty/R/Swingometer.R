# Swingometer
#
# Currently this is just an R script but may be transitioned to a R Package if the size of the work
# requires it. Currently does a rudimentary analysis of the data

library(foreign)
library(nnet)
library(reshape2)
library(data.table)
library(ggplot2)
library(GGally)

# Import the data
ge.results <- list("2015" = fread("../../2015-UK-general-election-data-results-WEB/RESULTS FOR ANALYSIS.csv"),
                   "2010" = fread("../../GE2010-results-flatfile-website.csv"))
ref.results <- fread("../../EU-referendum-result-data.csv")
const.info <- fread("../../2015-UK-general-election-data-results-WEB/CONSTITUENCY.csv")

# Some quick cleaning tools
stringToInt <- function(number) {
  as.numeric(gsub(number, pattern = ",", replacement = ""))
}

# Convert string to int
to.convert <- c("Electorate", "Total number of valid votes counted")
ge.results$`2015`[, (to.convert) := lapply(.SD, stringToInt), .SDcols = to.convert]

# Set all NA values to zero as required
remove.na <- function (x) {
  missing.vals <- is.na(x)
  if(any(missing.vals)) x[missing.vals] <- 0
  x
}
removeNAValues <- function(voting.data) {
  integer.fields <- names(which(sapply(voting.data, is.integer)))
  voting.data[, (integer.fields) := lapply(.SD, remove.na), .SDcols = integer.fields]
}

ge.results <- lapply(ge.results, removeNAValues)

# Function to clean EU ref results data
getEUResultsByRegion <- function(eu.data) {
  # Gen numeric columns and set the type accordingly
  numeric.cols <- names(eu.data)[-c(2:5)]
  eu.data <- eu.data[, (numeric.cols) := lapply(.SD, as.numeric), .SDcols = numeric.cols]

  # Get EU result by region
  eu.by.region <- split(eu.data, eu.data$Region)
  eu.by.region <- lapply(eu.by.region,
                         function (x) {c(Remain = sum(x$Remain),
                                         Leave = sum(x$Leave),
                                         Total = sum(x$Valid_Votes))})

  # Calculate the percentage remain by region
  pc.remain <- sapply(eu.by.region, function(x) x["Remain"]/x["Total"])
  names(pc.remain) <- names(eu.by.region)

  pc.remain
}

pc.remain <- getEUResultsByRegion(ref.results)

# Ad the remain result to the table
ge.results <- lapply(ge.results, function(x) x[, Vote_Remain_Pct := pc.remain[x$Region]])
setnames(ge.results$`2010`, "Con", "C")
setnames(ge.results$`2015`, "Total number of valid votes counted", "Votes")

key.party.cols <- c("LD", "C", "Lab")

# Find the winner of the constituency
getConstituencyWinner <- function(con.data, relevant.columns) {
  winner <- apply(con.data[, relevant.columns, with = F], 1, which.max)
  winner <- names(con.data)[relevant.columns][winner]
  winner[!winner %in% key.party.cols] <- "OTHER"
  winner
}

ge.results$`2015`[, Winner := getConstituencyWinner(ge.results$`2015`, 11:147)]
ge.results$`2010`[, Winner := getConstituencyWinner(ge.results$`2010`, 7:144)]

getSwing <- function(elec.data, test.polling.numbers = c(0.09, 0.35, 0.35)) {

  # Get the percentage of votes by party
  pc.v.names <- paste0(key.party.cols, "_PC_Vote")
  getPercentage <- function(x) {x/elec.data$Votes}

  # Update the table accodingly
  elec.data[, (pc.v.names) := lapply(.SD, getPercentage), .SDcols = key.party.cols]
  elec.data[, OTHER_PC_VOTE :=  1 - apply(elec.data[, pc.v.names, with = F],1,sum, na.rm = T)]

  # Update meta
  key.party.cols <- c(key.party.cols, "OTHER")
  pc.v.names <- c(pc.v.names, "OTHER_PC_VOTE")

  # Calculate the distance each constituency is from the mean
  dis.mean <- paste0(key.party.cols, "_DIFF_MEAN")
  getDistanceFromMean <- function(x) {x - mean(x, na.rm = T)}
  elec.data[, (dis.mean) := lapply(.SD, getDistanceFromMean), .SDcols = pc.v.names]

  # Test polling numbers
  test.polling.numbers <- c(test.polling.numbers, 1 - sum(test.polling.numbers))
  names(test.polling.numbers) <- key.party.cols

  # Function which gets the winner (based on index)
  getWinner <- function(dist.figs, polling.nums) {
    key.party.cols[which.max(polling.nums + as.vector(dist.figs))]
  }

  getPercentage <- function(dist.figs, polling.nums) {
    polling.nums + as.vector(dist.figs)
  }

  # Calculate the percentages by constituency
  percentages <- t(apply(elec.data[,dis.mean, with = F], 1,
                         getPercentage, polling.nums = test.polling.numbers))

  # Get the predictions
  predictions <- data.table(constituency = elec.data$`Constituency Name`,
                            winner = factor(apply(elec.data[,dis.mean, with = F], 1,
                                                  getWinner, polling.nums = test.polling.numbers)),
                            LD_RESULT = percentages[,"LD"], C_RESULT = percentages[,"C"],
                            Lab_RESULT = percentages[,"Lab"], OTHER_RESULT = percentages[,"OTHER"])

}

predictions <- lapply(ge.results, getSwing)

poll.2015 <- list(C = 35, Lab = 35, LD = 9, OTHER = 21)
poll.2010 <- list(C = 37, Lab = 28, LD = 27, OTHER = 8)

pred.data <- ge.results$`2010`[,c("Winner", "LD_DIFF_MEAN", "C_DIFF_MEAN", "Lab_DIFF_MEAN", "OTHER_DIFF_MEAN"), with = F]
test.data <- copy(pred.data)

pred.data[,(c("C_POLL", "Lab_POLL", "LD_POLL", "OTHER_POLL")) := lapply(poll.2015,rep, times = 651)]
test.data[,(c("C_POLL", "Lab_POLL", "LD_POLL", "OTHER_POLL")) := lapply(poll.2010,rep, times = 651)]

model.2010 <- multinom(Winner ~  LD_DIFF_MEAN + C_DIFF_MEAN + Lab_DIFF_MEAN + OTHER_DIFF_MEAN +
                         C_POLL + Lab_POLL + LD_POLL + OTHER_POLL,
                       data = test.data)

pred.2015 <- predict(model.2010,newdata = pred.data)
cat("\n\n")
cat("Multinomial Logistic Prediciton\n")
print(table(pred.2015))

cat("\nSwingometer")
print(table(predictions$`2010`$winner))

cat("\nActual result")
print(table(ge.results$`2015`$Winner))

# Create a quick plot
# ggpairs(ge.results$`2015`[, c("Vote_Remain_Pct", pc.v.names), with = F])
# ggpairs(ge.results$`2010`[, c("Vote_Remain_Pct", pc.v.names), with = F])
#
#
# # Write the prediction to csv
# write.csv(x = predictions$`2015`,file =  "../../predictions_2015.csv", row.names =F)
# write.csv(x = predictions$`2015`,file =  "../../predictions_2010.csv", row.names =F)
