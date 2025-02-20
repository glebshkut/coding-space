import { useCollection } from "../../hooks/useCollection"
import ButtonLink from "../reusable/ButtonLink"
import Card from "../reusable/Card"
import SkeletonCard from "../skeletons/SkeletonCard"
import Icons from "../SvgIcons/Icons"

const LatestResources = () => {
  const { documents, isLoading } = useCollection("resources", null, 6, [
    "createdAt",
    "desc",
  ])

  return (
    <main className="mt-32 flex flex-col">
      <h2 className="text-5xl text-center text-white font-extrabold">Latest Resources</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center my-8">
        {!isLoading
          ? documents.map((resource) => <Card key={resource.id} card={resource} />)
          : [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
      </div>
      <ButtonLink to="/resources" className="self-center">
        View more
        <Icons.ArrowRight className="ml-2 -mr-1" />
      </ButtonLink>
    </main>
  )
}

export default LatestResources
