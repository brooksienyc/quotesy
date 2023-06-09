// once deploy to heroku change this value to that url
const API_URL = "mongodb+srv://cbrooksie:P8O2mqjzfhjTkgh4@cluster0.slfno6f.mongodb.net/"

const quoteDiv = document.getElementById("quotes")
const quoteForm = document.getElementById("quoteForm")

let selectedQuoteId = ""; // this variable will store the ID of the random quote that appears if user wants to change it

const quoteBtn = document.getElementById("get-random-quote")
quoteBtn.addEventListener('click', getAQuote)

const addQuoteBtn = document.getElementById("add-a-quote");
addQuoteBtn.addEventListener("click", addQuote);

const updateQuoteBtn = document.getElementById("update-a-quote");
updateQuoteBtn.addEventListener("click", () => updateQuote(selectedQuoteId));

const deleteQuoteBtn = document.getElementById("delete-a-quote");
deleteQuoteBtn.addEventListener("click", () => deleteQuote(selectedQuoteId));



// async function getAQuote() {
//     console.log(selectedQuoteId)
//     const response = await fetch("http://localhost:3000/quotes/all")
//         .then((response) => response.json())
//         .then((data) => {
//             const quotes = data;
//             if (quotes.length > 0) {
//                 const randomIndex = Math.floor(Math.random() * quotes.length);
//                 const randomQuote = quotes[randomIndex];
//                 console.log(randomQuote)
//                 selectedQuoteId = randomQuote.id;
//                 displayQuote(selectedQuoteId);
//             } else {
//                 quoteDiv.textContent = "No quotes available."
//             }
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// }

async function getAQuote() {
    const response = await fetch("http://localhost:3000/quotes/all")
        .then((response) => response.json())
        .then((data) => {
            const quotes = data;
            if (quotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];
                selectedQuoteId = randomQuote._id; // Use `_id` instead of `id`
                displayQuote(selectedQuoteId);
            } else {
                quoteDiv.textContent = "No quotes available.";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

async function displayQuote(id) {
    try {
        const response = await fetch(`http://localhost:3000/quotes/${id}`);

        const quotes = await response.json();

        if (quotes.length > 0) {
            const quote = quotes[0]; // Get the first quote object
            quoteDiv.innerHTML = `
            <p class="text-4xl">${quote.author}</p>
            <p><strong>Category:</strong> ${quote.category}</p>
            <p><strong>Text:</strong> ${quote.text}</p>
        `;
        } else {
            quoteDiv.textContent = "No quotes available.";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function addQuote() {
    // newId was just added
    const newId = document.getElementById("newId").value;
    const newCategory = document.getElementById("category").value;
    const newAuthor = document.getElementById("author").value;
    const newText = document.getElementById("text").value;

    try {
        const response = await fetch("http://localhost:3000/quotes/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category: newCategory, author: newAuthor, text: newText }),
        });

        console.log(response)

        if (response.ok) {
            const data = await response.json();
            const newIndex = data.newIndex;
            console.log("New quote index:", newIndex);
            // Update the displayed quote after adding
            // getAQuote();
        } else {
            throw new Error("Unable to add new quote");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updateQuote() {
    const id = selectedQuoteId;
    console.log(`This is the selectedQuoteId: ${selectedQuoteId}`)
    const newCategory = document.getElementById("category").value;
    const newAuthor = document.getElementById("author").value;
    const newText = document.getElementById("text").value;
    try {
        const quote = await fetch(`http://localhost:3000/quote/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ category: newCategory, author: newAuthor, text: newText }),
            }
        )

        if (response.ok) {
            // Update the displayed quote after updating
            quoteDiv.innerHTML = body.value
        } else {
            throw new Error("Unable to update quote");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteQuote() {
    const id = selectedQuoteId;
    console.log(selectedQuoteId)
    try {
        const response = await fetch(`http://localhost:3000/quotes/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            }
        );

        if (response.ok) {

            quoteDiv.innerHTML = ""
        } else {
            throw new Error("Unable to delete quote");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}