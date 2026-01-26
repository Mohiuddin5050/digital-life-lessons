import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Container from "../../components/Container";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-contributors");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <section className="py-10 md:py-20 mb-10 md:mb-20 bg-accent/5 rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 lg:w-8/12 mx-auto">
            <h2 className="font-bold text-xl md:text-4xl">
              Top Contributors of the Week
            </h2>
            <p className="font-semibold my-3">
              Celebrating the most active contributors who shared their valuable
              life lessons this week. See who’s inspiring our community with
              their insights and knowledge!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {contributors.map((user, i) => (
              <Link
                to={`/profile/${user.email}`}
                key={i}
                className="bg-white p-5 rounded-xl shadow text-center w-[250px]"
              >
                <img
                  src={user.photo}
                  alt={user.name}
                  className="h-30 w-30 rounded-full mx-auto mb-3"
                />
                <h4 className="font-semibold text-lg">{user.name}</h4>
                <p className=" text-gray-500">
                  <strong className="numberFont">{user.lessonCount}</strong>{" "}
                  lessons this week
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default TopContributors;
