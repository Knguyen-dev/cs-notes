import Card from "./components/Card";
const cards = [
	{
		id: 1,
		imgObj: {
			src: "img/hat-1.jpg",
			alt: "a grey baseball hat with a small palm tree on the front",
		},
		title: "Lorem, ipsum dolor.",
		price: "$325",
		description: "Lorem, ipsum dolor.",
	},
	{
		id: 2,
		imgObj: {
			src: "img/hat-2.jpg",
			alt: "",
		},
		title: "Ullam, cum ut.",
		price: "$315",
		description: "Iure, voluptate corrupti.",
	},
	{
		id: 3,
		imgObj: {
			src: "img/hat-3.jpg",
			alt: "",
		},
		title: "Libero, ab dolorem?",
		price: "$225",
		description: "Eveniet, necessitatibus id.",
	},
	{
		id: 4,
		imgObj: {
			src: "img/hat-4.jpg",
			alt: "",
		},
		title: "Minima, earum ipsam.",
		price: "$500",
		description: "Illo, dolorem magnam?",
	},
	{
		id: 5,
		imgObj: {
			src: "img/hat-5.jpg",
			alt: "",
		},
		title: "Odio, nam consequatur.",
		price: "$255",
		description: "Quos, facere alias.",
	},
	{
		id: 6,
		imgObj: {
			src: "img/hat-6.jpg",
			alt: "",
		},
		title: "Quidem, aut numquam!",
		price: "$345",
		description: "Aliquid, enim ea.",
	},
	{
		id: 7,
		imgObj: {
			src: "img/hat-7.jpg",
			alt: "",
		},
		title: "Accusantium, placeat dolores?",
		price: "$105",
		description: "Corporis, commodi facilis!",
	},
];

export default function App() {
	return (
		<div className="container">
			<div className="product-grid">
				{cards.map((card, index) => {
					return <Card key={card.id} cardObj={card} isFeatured={index === 0} />;
				})}
			</div>
		</div>
	);
}
