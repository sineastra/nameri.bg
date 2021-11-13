import MainPageLayout from "../../Components/common/MainPageLayout/MainPageLayout.jsx"
import HeadPageBanner from "../../Components/HeadPageBanner/HeadPageBanner.jsx"


const HomePage = () => {

	return (
		<MainPageLayout>
			<HeadPageBanner/>
			<main>
				<section>POPULR CATEGORIES</section>
				<section>
					<div>NEW OBQVI</div>
					<div>POPULAR OBQVI</div>
				</section>
			</main>
			<section>
				BANNER NA SAITA
			</section>
		</MainPageLayout>
	)
}

export default HomePage