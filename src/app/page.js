import Image from "next/image";
import Banner from "./banner/page";
import Blogs from "./blogs/page";
import Testimonial from "./testimonial/page";
import Newsletter from "./newsletter/page";
import Faq from "./faq/page";

export default function Home() {
  return (
    <div>
      <Banner/>
      <Blogs/>
      <Testimonial/>
      <Newsletter/>
      <Faq/>
    </div>
  );
}
