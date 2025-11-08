import Image from "next/image"
import AdBannerImg from './../../public/images/pillow-bed-decoration-interior-bedroom.jpg';
import Button from "./Button";
const AdBanner = () => {
    return (
        <div className="flex flex-col md:flex-row bg-neutral-2 gap-12 items-center">
            <Image
                src={AdBannerImg}
                alt='banner Image'
                priority
                className='w-full md:w-1/2 h-full object-cover aspect-auto object-center'
            />
            <div className="p-6 space-y-4">
                <h4 className="text-blue font-bold">SALE UP TO 35% OFF</h4>
                <h1 className="text-3xl font-bold max-w-xs">HUNDREDS OF NEW LOWER PRICES !</h1>
                <p className="text-neutral-4">Upgrade your home with our stylish and comfortable pillows. Limited time offer!</p>
                <Button text="Shop Now" href="/shop"/>
            </div>
        </div>
    )
}

export default AdBanner
