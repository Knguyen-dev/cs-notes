const cards = [];

export default function App() {
	return (
		<div className="container">
			<div className="product-grid">
				<div className="card">
					<img
						src="img/hat-1.jpg"
						alt="A grey baseball hat"
						className="card__img"
					/>
					<div className="card__content">
						<h2 className="card__title"></h2>
						<p className="card__price"></p>
						<p className="card__description"></p>
					</div>
				</div>
			</div>
		</div>
	);
}
