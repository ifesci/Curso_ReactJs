import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";

function App() {
  const products = [
    { id: 1, image: "https://picsum.photos/300/200?random=1", title: "Produto 1", description: "Descrição do Produto 1" },
    { id: 2, image: "https://picsum.photos/300/200?random=2", title: "Produto 2", description: "Descrição do Produto 2" },
    { id: 3, image: "https://picsum.photos/300/200?random=3", title: "Produto 3", description: "Descrição do Produto 3" },
    { id: 4, image: "https://picsum.photos/300/200?random=4", title: "Produto 4", description: "Descrição do Produto 4" },
    { id: 5, image: "https://picsum.photos/300/200?random=5", title: "Produto 5", description: "Descrição do Produto 5" },
    { id: 6, image: "https://picsum.photos/300/200?random=6", title: "Produto 6", description: "Descrição do Produto 6" },
  ];
  return (
    <>
      <Header />
      <main className="container my-3">
        <h1>Produtos</h1>
        <hr />
        <div className="row row-cols-4 g-3">
          {products.map((product) => (
            <Card key={product.id} image={product.image} title={product.title} description={product.description} link={"/produto/" + product.id} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App;