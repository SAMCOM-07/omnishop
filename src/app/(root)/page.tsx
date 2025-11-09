import Guarantee from "@/components/Guarantee";
import Main from "@/components/Main";
import NewArrivals from "@/components/NewArrivals";
import Newsletter from "@/components/Newsletter";


export default function Home() {

  return (
    <div className="space-y-20">
      <div className='container space-y-20'>
        <Main />
        <NewArrivals />
        <Guarantee />
      </div>
      <Newsletter />
    </div>
  )
}
