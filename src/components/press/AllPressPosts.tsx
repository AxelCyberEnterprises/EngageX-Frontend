import PressCard from "./PressCard";

function AllPressPosts() {
  const posts = [
    {
      img: "./assets/pressimg1.jpeg",
      date: "25 Mar 2025",
      title: "New platform launch",
      download: true,
      summary:
        "Join the creator of EngageX™ and its design engineers on Friday, May 16th, from 8:00–8:30 AM CST to learn more about this revolutionary new platform.",
    },
    {
      img: "./assets/pressimg2.png",
      date: "25 Mar 2025",
      title: "Command the room",
      summary:
        "Welcome to Command the Room, powered by EngageX™. I’m The Career Doctor and in each short, sharp episode, we dive into the minds of bold communicators, leaders, creators, athletes, and entrepreneurs who know how to move audiences, close deals, and own the moment. From storytelling to pitching, interviewing to presenting you’ll learn the real strategies behind speaking with power and leading with presence. Let’s go.",
    },
    {
      img: "./assets/pressimg3.png",
      date: "25 Mar 2025",
      title: "Chief In Brief",
      summary:
        "We believe the diversity of our community makes us exponentially more impactful and our vision is a future where one's race, gender identity/expression, sexual orientation, disability, or nationality is not a barrier to leadership.",
    },
    {
      img: "./assets/pressimg4.png",
      date: "25 Mar 2025",
      title: "AFROTECH",
      summary:
        "Join us for free snacks and giveaways during this year’s AfroTech Weekend offsite evening event. Check back here for location and time updates.",
    },
    {
      img: "./assets/pressimg5.png",
      date: "25 Mar 2025",
      title: "Fireside Chat",
      summary:
        "Join us for free snacks and giveaways during this year’s AfroTech Weekend offsite evening event. Check back here for location and time updates.",
    },
    {
      img: "./assets/pressimg6.png",
      date: "25 Mar 2025",
      title: "AFROTECH",
      summary:
        "Join us for free snacks and giveaways during this year’s AfroTech Weekend offsite evening event. Check back here for location and time updates.",
    },
    {
      img: "./assets/pressimg7.png",
      date: "25 Mar 2025",
      title: "AFROTECH",
      summary:
        "Join us for free snacks and giveaways during this year’s AfroTech Weekend offsite evening event. Check back here for location and time updates.",
    },
  ];
  return (
    <section className="space-y-10 px-10 mt-10 pb-20">
      <h5>All press posts</h5>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <PressCard post={post} key={idx} />
        ))}
      </div>
    </section>
  );
}

export default AllPressPosts;
