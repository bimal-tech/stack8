
const Welcome = () => {

    // jsx
    return (
        <p>
            Hello World!!
        </p>
    )
}

const SecondCOl = () => {
    // 
    return (
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ipsa, magni vitae laborum a repellendus ad vel? Velit aut autem repellendus fugiat totam. Nobis, assumenda non delectus corporis eveniet et?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi voluptates vero repudiandae sint totam iure nisi officia voluptatem unde harum, blanditiis qui eum earum, dolorum, error nemo esse. Sed, quisquam.
            Accusantium pariatur numquam sequi placeat magni optio maxime ducimus accusamus qui hic recusandae, commodi iusto ullam ab. Quo rerum molestiae mollitia praesentium sunt accusamus unde voluptates, incidunt, nulla soluta asperiores!
            Quod veritatis reprehenderit placeat quam ducimus reiciendis ratione laudantium sint excepturi itaque iusto, animi, dolores quasi non quis! Provident quae omnis mollitia, officia enim quas eum quod excepturi adipisci commodi!
            Possimus porro necessitatibus commodi rerum expedita, at quae assumenda. Eos modi sunt maiores expedita quod delectus id commodi obcaecati, minus ducimus, amet harum atque aspernatur est deserunt dolor officia culpa.
            Dicta quam placeat doloribus quia! Eum ab rem optio. Odio accusamus ad aperiam fugiat totam temporibus doloremque ipsam modi dolore recusandae necessitatibus quas, ullam veritatis labore libero, dolorem sapiente cumque!
        
        </p>
    )
}
const domContainer = document.querySelector('#firstPara');
const root = ReactDOM.createRoot(domContainer);
root.render(<Welcome />);

const secondCol = document.querySelector('#secondCol')
const react_dom = ReactDOM.createRoot(secondCol);
react_dom.render(<SecondCOl />)