    async function getBookList(){
    let response = await fetch('http://localhost:3001/listBooks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let listBooks = await response.json()
    return listBooks;
}
getBookList().then(listBooks => {
    const bookListUL = document.createElement('ul');

    listBooks.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title}`;

        const countBox = document.createElement('input');
        countBox.type = 'text';
        countBox.id = `countBox_${book.id}`
        countBox.value = book.quantity
        listItem.appendChild(countBox);
        bookListUL.appendChild(listItem);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.type = 'button';
        saveButton.id = 'saveButton';

        saveButton.addEventListener('click', async function(){
            let bookId = book.id;
            let newQuantity = countBox.value;

            let response = await fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "quantity": newQuantity,
                    "id": bookId
            }),
        });
        let updatedBook = await response.json()
        console.log(updatedBook)
        });
        listItem.appendChild(saveButton);
    });

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(bookListUL);
});


// chrome console from earlier in activity below
    // let response = await fetch('http://localhost:3001/updateBook', {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "title": "The Annals of Arathrae",
    //         "id": 3
    //     }),
    // });
    // let updatedBook = await response.json()
    // console.log(updatedBook)