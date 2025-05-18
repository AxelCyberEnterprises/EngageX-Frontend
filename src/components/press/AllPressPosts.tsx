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
      img: "./assets/pressimg3.jpeg",
      date: "25 Mar 2025",
      title: "Chief In Brief",
      summary: "",
    },
    {
      img: "./assets/pressimg4.png",
      date: "25 Mar 2025",
      title: "AFROTECH",
      summary:
        "Join us for free snacks and giveaways during this year’s AfroTech Weekend offsite evening event. Check back here for location and time updates.",
    },
    // {
    //   img: "./assets/pressimg5.png",
    //   date: "25 Mar 2025",
    //   title: "Fireside Chat",
    //   summary:
    //     "Join us for free snacks and giveaways during this year’s AfroTech Weekend offsite evening event. Check back here for location and time updates.",
    // },
    {
      img: "./assets/pressimg6.png",
      date: "25 Mar 2025",
      title: "Coming soon",
      summary: "",
    },
    {
      img: "./assets/pressimg7.png",
      date: "25 Mar 2025",
      title: "Tech talk",
      summary:
        "Coming this June and August 2025, Tech Talk Conversations will stream live on EngageX™️, bringing together leading voices in technology to unpack the trends shaping tomorrow. From breakthroughs in AI and cybersecurity to the evolving relationship between humans and machines, each session will offer sharp insights, interactive discussions, and forward-thinking perspectives. Whether you’re in tech, business, or simply future curious, join us live and be part of the conversations driving innovation.",
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
