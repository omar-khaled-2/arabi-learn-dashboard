
class Member {
  constructor(public name: string, public role: string) {}

}

const members: Member[]  = [
  new Member("Omar Khaled", "Backend Engineer, Cloud Engineer"),
  new Member("Abdelrahman Sabry", "ML Engineer"),
  new Member("Mazen Tamer","Flutter Developer"),
  new Member("Muhammed Wael","ML Engineer, Software Engineer"),
  new Member("Mohamed Samy","Flutter Developer"),
  new Member("Osama Ahmed","ML Engineer"),
] 

export const metadata = {
  title: "Team",
  description: "Meet our team",
};

export default function TeamPage() {
  return (
    <div>
      <div className="pt-20 grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Meet our Team
          </h2>
          <p className="mt-6 text-sm leading-8">
            we believe that the heart of our success lies in our incredible
            team. We are a diverse group of passionate individuals who bring our
            unique talents and perspectives to every challenge. Get to know the
            people behind our achievements!
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {members.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <div>
                  <h3 className="font-semibold tracking-wide text-xl">
                    {person.name}
                  </h3>
                  <p className="text-xs font-thin">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
