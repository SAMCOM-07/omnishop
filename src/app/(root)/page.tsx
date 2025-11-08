import Guarantee from "@/components/Guarantee";
import Main from "@/components/Main";
import NewArrivals from "@/components/NewArrivals";


export default function Home() {

  return (
    <div className="space-y-12 container pb-18">
      <Main />
      <NewArrivals />
      <Guarantee />
    </div>
  )
}
