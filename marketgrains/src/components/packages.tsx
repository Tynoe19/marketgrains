import { packages } from "../data/packages"

const Packages = () => {
  return (
    <section>
        <h2>Distributor Packages</h2>


      {packages.map((pkg) => (
        <div key={pkg.id}>
          <h3>{pkg.name}</h3>
          <p>Order Value: {pkg.orderValue}</p>
          <p>Sales Value: {pkg.salesValue}</p>
          <p>Profit: {pkg.profit}</p>
            <button>
                View Package
            </button>
        </div>
      ))}
    </section>
  );
};

export default Packages;