const ProductCard = ({id, name, description, price, stock, categories}) => {

    return (
    <>
        <ul>
            <li><h3>{name}</h3></li>
            <li><p>{id}</p></li>
            <li><p>{description}</p></li>
            <li><p>{price}</p></li>
            <li><p>{stock}</p></li>
            <li><p>{categories}</p></li>
        </ul>
    </>
    )
}

export default ProductCard