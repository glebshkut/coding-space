import { Link } from "react-router-dom"

import { useCollection } from "../../hooks/useCollection"
import Card from "../reusable/Card"
import SkeletonCard from "../skeletons/SkeletonCard"

const Challenges = () => {
  const { documents, isLoading } = useCollection("challenges", null, 6, [
    "createdAt",
    "desc",
  ])

  return (
    <main className="mt-20 flex flex-col">
      <h2 className="text-5xl text-center text-white font-bold font-heading">
        Latest Challenges
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center my-8">
        {!isLoading
          ? documents.map((challenge) => {
              return (
                <Card key={challenge.id} card={challenge} challengelist isChallenge />
              )
            })
          : [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard isChallenge key={n} />)}
      </div>
      <Link
        to="/challenges"
        className="inline-flex items-center justify-center self-center px-4 py-2 text-base font-medium text-center border rounded-lg text-white transition-colors border-gray-700 hover:bg-gray-800"
      >
        View more
        <i className="fas fa-arrow-right ml-2"></i>
      </Link>
    </main>
  )
}

export default Challenges
