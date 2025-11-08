import Guarantee from "@/components/Guarantee";
import Main from "@/components/Main";
import NewArrivals from "@/components/NewArrivals";
import AdBanner from "@/components/AdBanner";
import Newsletter from "@/components/Newsletter";


export default function Home() {

  return (
    <div className="space-y-20 pb-18">
      <div className='container space-y-20'>
        <Main />
        <NewArrivals />
      </div>
      <AdBanner />
      <div className="container"><Guarantee /></div>
      <Newsletter />
    </div>
  )
}
