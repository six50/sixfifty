# Swingometer
#
# Currently this is just an R script but may be transitioned to a R Package if the size of the work
# requires it. Currently does a rudimentary analysis of the data

library(data.table)
library(ggplot2)
library(GGally)

# Import the data
ge.results.2015 <- fread("../../2015-UK-general-election-data-results-WEB/RESULTS FOR ANALYSIS.csv")
ref.results <- fread("../../EU-referendum-result-data.csv")
const.info <- fread("../../2015-UK-general-election-data-results-WEB/CONSTITUENCY.csv")

# Some quick cleaning tools
stringToInt <- function(number) {
  as.numeric(gsub(number, pattern = ",", replacement = ""))
}

# Convert string to int
to.convert <- c("Electorate", "Total number of valid votes counted")
ge.results.2015 <- ge.results.2015[, (to.convert) := lapply(.SD, stringToInt), .SDcols = to.convert]

integer.fields <- names(which(sapply(ge.results.2015, is.integer)))
remove.na <- function (x) {
  x[is.na(x)] <- 0
  x
}
ge.results.2015[, (integer.fields) := lapply(.SD, remove.na), .SDcols = integer.fields]

numeric.cols <- names(ref.results)[-c(2:5)]
ref.results <- ref.results[, (numeric.cols) := lapply(.SD, as.numeric), .SDcols = numeric.cols]

# Get EU result by region
eu.by.region <- split(ref.results, ref.results$Region)
eu.by.region <- lapply(eu.by.region,
                        function (x) {c(Remain = sum(x$Remain),
                                        Leave = sum(x$Leave),
                                        Total = sum(x$Valid_Votes))})

# Calculate the percentage remain by region
pc.remain <- sapply(eu.by.region, function(x) x["Remain"]/x["Total"])
names(pc.remain) <- names(eu.by.region)

# Ad the remain result to the table
ge.results.2015[, Vote_Remain_Pct := pc.remain[ge.results.2015$Region]]

# Get the percentage of votes by party
key.party.cols <- c("LD", "C", "Lab")
pc.v.names <- paste0(key.party.cols, "_PC_Vote")
getPercentage <- function(x) {x/ge.results.2015$`Total number of valid votes counted`}

# Update the table accodingly
ge.results.2015[, (pc.v.names) := lapply(.SD, getPercentage), .SDcols = key.party.cols]
ge.results.2015[, OTHER_PC_VOTE :=  1 - apply(ge.results.2015[, pc.v.names, with = F],1,sum, na.rm = T)]

# Update meta
key.party.cols <- c(key.party.cols, "OTHER")
pc.v.names <- c(pc.v.names, "OTHER_PC_VOTE")

# Calculate the distance each constituency is from the mean
dis.mean <- paste0(key.party.cols, "_DIFF_MEAN")
getDistanceFromMean <- function(x) {x - mean(x, na.rm = T)}
ge.results.2015[, (dis.mean) := lapply(.SD, getDistanceFromMean), .SDcols = pc.v.names]

# Test polling numbers (as of 20th of April 2010)
test.polling.numbers <- c(0.10, 0.44, 0.26)
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
percentages <- t(apply(ge.results.2015[,dis.mean, with = F], 1,
                     getPercentage, polling.nums = test.polling.numbers))

# Get the predictions
predictions <- data.table(constituency = ge.results.2015$`Constituency Name`,
                          winner = factor(apply(ge.results.2015[,dis.mean, with = F], 1,
                                                               getWinner, polling.nums = test.polling.numbers)),
                          LD_RESULT = percentages[,"LD"], C_RESULT = percentages[,"C"],
                          Lab_RESULT = percentages[,"Lab"], OTHER_RESULT = percentages[,"OTHER"])

# Create a quick plot
ggpairs(ge.results.2015[, c("Vote_Remain_Pct", pc.v.names), with = F])

# Write the prediction to csv
write.csv(x = predicitons,file =  "../../predictions.csv", row.names =F)
