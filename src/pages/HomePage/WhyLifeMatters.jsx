import { FaBrain, FaHeart, FaChartLine, FaUsers } from "react-icons/fa";
import Container from "../../components/Container";

const WhyLifeMatters = () => {
  return (
    <Container>
      <section className="my-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Why Learning From Life Matters
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Every experience carries a lesson. Reflecting on life helps us grow
            emotionally, mentally, and socially.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-md text-center p-6">
            <FaBrain className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              Builds Self-Awareness
            </h3>
            <p className="text-sm text-gray-500">
              Understanding past experiences helps you recognize patterns and
              make better decisions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-md text-center p-6">
            <FaHeart className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Emotional Growth</h3>
            <p className="text-sm text-gray-500">
              Reflecting on emotions strengthens empathy, gratitude, and
              emotional intelligence.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-md text-center p-6">
            <FaChartLine className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Personal Development</h3>
            <p className="text-sm text-gray-500">
              Lessons learned from life experiences guide continuous improvement
              and growth.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card bg-base-100 shadow-md text-center p-6">
            <FaUsers className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Learn From Community</h3>
            <p className="text-sm text-gray-500">
              Shared life lessons allow people to learn from each other and feel
              connected.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default WhyLifeMatters;
