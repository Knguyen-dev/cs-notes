/* eslint-disable react/prop-types */

export default function Card({ cardObj, isFeatured }) {
	return (
		<div className={`card stacked ${isFeatured ? "featured" : ""}`}>
			<img
				src={cardObj.imgObj.src}
				alt={cardObj.imgObj.alt}
				className="card__img"
			/>
			<div className="card__content">
				<h2 className="card__title">{cardObj.title}</h2>
				<p className="card__price">{cardObj.price}</p>
				<p className="card__description">{cardObj.description}</p>
			</div>
		</div>
	);
}
