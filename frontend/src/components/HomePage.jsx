import { Link } from "react-router-dom";
import one from "../assets/home-page/1.png";
import two from "../assets/home-page/2.jpg";
import three from "../assets/home-page/3.jpg";

export default function HomePage() {
  return (
    <main className="flex relative md:pl-60">
      <Link
        to="/profile"
        className="bg-white shadow-sm rounded-full p-2 absolute top-8 right-8"
      >
        <img src={one} className="size-10 rounded-full bg-red-100" />
      </Link>

      <section className="flex justify-center gap-20 px-20 flex-col md:flex-row">
        <aside className="w-full flex gap-8 flex-col pt-40">
          <h1 className="font-bold leading-10 text-5xl inter">
            Welcome to <span className="text-[#17A0D4]">Dulantey !</span>
          </h1>
          <p className="text-2xl text-[#5D5D5D]">
            Explore, connect, and uncover the magic of Kathmandu with local
            insights and guided adventures. Whether you&apos;re seeking iconic
            landmarks or looking for unique local experiences, Dulantey connects
            you with trusted guides and curated travel tips to make your journey
            unforgettable.
          </p>
        </aside>
        <section className="w-full flex items-center justify-center gap-10 md:mt-40">
          <section className="flex flex-col gap-10">
            <img src={one} />
            <img src={two} />
          </section>
          <section>
            <img src={three} />
          </section>
        </section>
      </section>
    </main>
  );
}
