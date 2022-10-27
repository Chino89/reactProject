import SmallCard from "./SmallCard";

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */

let moviesInDB = {
  title: "Total de Productos",
  color: "primary",
  quantity: 21,
  icon: "fat fa-birthday-cake",
};

/* <!-- Total awards --> */

let totalAwards = {
  title: " Total de Usuarios",
  color: "success",
  quantity: "79",
  icon: "fa-regular fa-user ",
};

/* <!-- Actors quantity --> */

let actorsQuantity = {
  title: "Total de Categorias",
  color: "warning",
  quantity: "49",
  icon: "fal fa-star",
};

let cartProps = [moviesInDB, totalAwards, actorsQuantity];

function ContentRowMovies() {
  return (
    <div className="row">
      {cartProps.map((movie, i) => {
        return <SmallCard {...movie} key={i} />;
      })}
    </div>
  );
}

export default ContentRowMovies;
