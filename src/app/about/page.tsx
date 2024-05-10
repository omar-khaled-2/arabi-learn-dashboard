export const metadata = {
  title: "About",
  description: "Learn more about our project",
};
const AboutPage = () => {
  return (
    <div className="flex flex-col text-center pt-20 gap-20">
      <div className="flex flex-col gap-2 items-start text-start">
        <h1 className="mb-2 text-xl md:text-3xl font-bold tracking-widest">
          About Our Project
        </h1>
        <p className="text-xs md:text-md mt-2 tracking-widest leading-8">
          Our project is focused on creating a mobile application specifically
          designed to help children learn Arabic through engaging and interactive
          methods. By integrating cutting-edge technology with proven educational
          strategies, we strive to offer an immersive learning environment that
          captures childrens attention and stimulates their curiosity. Our app
          incorporates a variety of multimedia elements, such as animations,
          games, and interactive quizzes, which are designed to make the learning
          process both effective and enjoyable.
        </p>
      </div>

      <div className="flex flex-col gap-2 items-start text-start">
        <h1 className="mb-2 text-xl md:text-3xl font-bold tracking-widest">
        Our Mission
        </h1>
        <p className="text-xs md:text-md mt-2 tracking-widest leading-8">
        Our primary goal is to make the learning of the Arabic language
          accessible, fun, and engaging for children globally. We believe in the
          importance of nurturing language skills from an early age, as this can
          significantly influence a childs cognitive development and cultural
          awareness. Through our app, we provide a platform where children can
          explore and master Arabic at their own pace, in a supportive and
          enriching environment. Our commitment extends beyond language
          learning; we are dedicated to fostering an appreciation for the rich
          cultural heritage associated with the Arabic language, enhancing
          global understanding and connectivity.
        </p>
      </div>

    </div>
  );
};

export default AboutPage;
