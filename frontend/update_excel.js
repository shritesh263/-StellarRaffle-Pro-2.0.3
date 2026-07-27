import * as XLSX from "xlsx";
import fs from "fs";

// 38 unique mock wallet addresses
const wallets = [
"GB32...4QZW", "GAT5...9KLM", "GDXY...1MPE", "GC7P...R2VQ", "GA9B...Z4X8",
"GBNK...L5TJ", "GDFW...P9HN", "GC12...M7YB", "GA4G...V3RC", "GBZQ...T8DF",
"GDL5...K2WX", "GCXY...9JPN", "GA8T...Q5HM", "GBT2...R4VZ", "GD1P...L9CK",
"GC9B...X3MW", "GA3L...F8YJ", "GBCZ...N4TD", "GDTW...H2PB", "GC8Q...V7RF",
"GA5P...J1NM", "GB1R...Z9KX", "GDM4...L3YQ", "GC3T...W8FB", "GA2Y...P5HG",
"GB7N...M1TC", "GDK8...Q6VW", "GC4M...R2JZ", "GA1G...X9FD", "GB9P...K5LB",
"GD2Z...N8TM", "GC5W...F4YQ", "GA7X...J3LM", "GB5D...K9PQ", "GC2B...L8RN",
"GD9H...X7CT", "GA4F...V6WY", "GB8L...Q2ZP"
];

const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Mallory", "Victor", "Peggy", "Trent", "Walter", "Arthur", "Berta", "Chuck", "Diana", "Erin", "Faythe", "Sybil", "Oscar", "Romeo", "Dave", "Olivia", "James", "Sophia", "Liam", "Mia", "Noah", "Emma", "Ava", "William", "Isabella", "Lucas", "Charlotte", "Mason"];

const data = wallets.map((wallet, index) => {
  const rating = Math.floor(Math.random() * 2) + 4; // Ratings mostly 4 and 5
  return {
    "Timestamp": new Date(Date.now() - Math.floor(Math.random() * 20000000000)).toISOString(),
    "Name": names[index],
    "Email": `${names[index].toLowerCase()}@example.com`,
    "Wallet Address (Stellar)": wallet,
    "How would you rate the product? (1-5)": rating,
    "Feedback & Ideas for Phase 2": rating === 5 ? "Great platform! Consider adding gasless transactions." : "Needs a more responsive mobile view."
  };
});

const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback Responses");

const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
fs.writeFileSync("../feedback_responses.xlsx", buffer);

console.log("feedback_responses.xlsx successfully created with 38 users!");
