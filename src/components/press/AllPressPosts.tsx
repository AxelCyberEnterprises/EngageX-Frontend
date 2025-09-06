import PressCard from "./PressCard";

function AllPressPosts() {
    const posts = [
        {
            img: "/assets/pressimg1.jpeg",
            date: "05 June 2025",
            title: "New platform launch",
            download: true,
            summary:
                "Join the creatives and web managers of Cd<sup>®</sup> Career Doctor, LLC as they discuss how they navigate all three platforms and market EngageX<sup>®</sup> along with with entire CDC, LLC brand.",
        },
        {
            img: "/assets/pressvid1.mp4",
            date: "25 Mar 2025",
            title: "Command the room",
            video: true,
            summary:
                "Welcome to Command the Room, powered by EngageX<sup>®</sup>. I'm The Cd<sup>®</sup> Career Doctor and in each short, sharp episode, we dive into the minds of bold communicators, leaders, creators, athletes, and entrepreneurs who know how to move audiences, close deals, and own the moment. From storytelling to pitching, interviewing to presenting you'll learn the real strategies behind speaking with power and leading with presence. Let's go.",
        },
        {
            img: "/assets/pressimg3.jpeg",
            date: "25 Mar 2025",
            title: "Chief In Brief",
            summary: "",
        },
        {
            img: "/assets/pressimg4.png",
            date: "25 Mar 2025",
            title: "AFROTECH",
            summary:
                "Join us for free snacks and giveaways during this year's AfroTech Weekend offsite evening event. Check back here for location and time updates.",
        },
        // {
        //   img: "/assets/pressimg5.png",
        //   date: "25 Mar 2025",
        //   title: "Fireside Chat",
        //   summary:
        //     "Join us for free snacks and giveaways during this year's AfroTech Weekend offsite evening event. Check back here for location and time updates.",
        // },
        {
            img: "/assets/pressimg6.png",
            date: "25 Mar 2025",
            title: "Coming soon",
            summary:
                "Join the EngageX<sup>®</sup> community and hear what the global media has to say about this amazing new platform.",
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
