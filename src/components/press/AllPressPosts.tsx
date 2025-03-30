import PressCard from "./PressCard";

function AllPressPosts() {
  const posts = [
    {
      img: "./assets/pressimg2.png",
      date: "25 Mar 2025",
      title: "Bill Walsh leadership lessons",
      summary:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    },
    {
      img: "./assets/pressimg3.png",
      date: "25 Mar 2025",
      title: "PM mental models",
      summary:
        "Mental models are simple expressions of complex processes or relationships.",
    },
    {
      img: "./assets/pressimg4.png",
      date: "25 Mar 2025",
      title: "PM mental models",
      summary:
        "Mental models are simple expressions of complex processes or relationships.",
    },
    {
      img: "./assets/pressimg5.png",
      date: "25 Mar 2025",
      title: "What is Wireframing?",
      summary:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    },
    {
      img: "./assets/pressimg6.png",
      date: "25 Mar 2025",
      title: "What is Wireframing?",
      summary:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    },
    {
      img: "./assets/pressimg7.png",
      date: "25 Mar 2025",
      title: "Bill Walsh leadership lessons",
      summary:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
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
