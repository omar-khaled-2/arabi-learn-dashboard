import Image from "next/image";

export default function Home() {
  return (
      <div className="flex flex-col flex-1 gap-[100px] lg:gap-[200px] py-[100px]">
        <div className="flex flex-col justify-center items-center gap-5 text-center">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold tracking-wider ">Making Arabic Learning Fun for Kids!</h1>
          <h4 className="text-sm md:text-md lg:text-lg leading-loose font-thin">Unlock the wonders of Arabic language learning with our innovative mobile application powered by artificial intelligence</h4>
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center">Why Choose Arabi Learn?</h1>
          <div className="grid grid-cols-2 self-stretch gap-10">
            <div className="flex flex-col gap-2">
                <h4 className="text-sm md:text-md lg:text-lg font-bold">Interactive Lessons</h4>
                <p className="text-xs md:text-sm lg:text-md font-thin">Our interactive lessons are tailored to suit young learners, making Arabic learning enjoyable and effective.</p>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-sm md:text-md lg:text-lg font-bold">Fun Activities</h4>
                <p className="text-xs md:text-sm lg:text-md font-thin">Learning is not just about memorization! We offer a variety of fun activities, games, and quizzes to keep kids motivated and entertained while they learn</p>
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="text-sm md:text-md lg:text-lg font-bold">Parental Dashboard</h4>
                <p className="text-xs md:text-sm lg:text-md font-thin">Stay informed about your child&apos;s progress with our easy-to-use parental dashboard. Track their achievements and monitor their learning journey effortlessly</p>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-sm md:text-md lg:text-lg font-bold">Safe and Secure</h4>
                <p className="text-xs md:text-sm lg:text-md font-thin">We prioritize the safety and privacy of our young users. Our app is COPPA compliant and adheres to the highest standards of online safety.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-start">
            <h1 className="text-xl md:text-2xl lg:text-4xl">Start Your Arabic Learning Adventure Today!</h1>
            <p className="text-sm font-thin leading-loose">
              Empower your child to explore the beauty of the Arabic language with Arabi learn. Whether they&apos;re beginners or looking to enhance their skills, our app provides the tools and support they need to succeed. Join thousands of families who have already embarked on this exciting journey with us!
            </p>
            <a className="btn btn-primary">Download now</a>
        </div>
   
      </div>
  );
}
``;
