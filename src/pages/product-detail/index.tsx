import ProductDetailProvider from "./_components/ProductContext";
import Wrapper from "./_components/Wrapper";

export default function ProductDetailPage() {
	return (
		<ProductDetailProvider>
			<Wrapper />
		</ProductDetailProvider>
	);
}
