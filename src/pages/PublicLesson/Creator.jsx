import { Link } from "react-router";
import Container from "../../components/Container";

const Creator = ({ lesson }) => {
  const author = lesson.author;

  return (
    <Container>
      <section className="py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Author Info</h2>
          </div>
          <img
            src={
              author.photoUrl ||
              `https://ui-avatars.com/api/?name=${author.displayName}`
            }
            alt={author.displayName}
            className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
          />

          <h3 className="font-bold text-2xl">{author.displayName}</h3>

          <p className="mt-3 text-gray-600">Total Lessons Created: {author.totalLessons}</p>

          <p className="font-bold text-xl text-primary">
            
          </p>

          <Link
            to={`/profile/${author.email}`}
            className="text-primary"
          >
            View all lessons →
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Creator;
