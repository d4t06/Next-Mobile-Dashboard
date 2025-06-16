import simonCat from "@/assets/simon_empty.png";

type Props = {
	product: Product;
	imageURL?: string;
};

export default function ProductItem({ product, imageURL }: Props) {
	return (
		<div className="flex mt-2.5 group">
			<div className="h-[70px] w-[70px]">
				<img
					alt=""
					src={imageURL || product.image_url || simonCat}
					className="rounded-md h-full object-contain"
				/>
			</div>
			<span className="text-[#333] font-[500] ml-[10px] group-hover:text-[#cd1818]">
				{product.product_name}
			</span>
		</div>
	);
}
