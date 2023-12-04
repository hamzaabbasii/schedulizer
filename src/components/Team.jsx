import MemberCard from "./MemberCard";
import teamData from "../data/teamData"; // Import your team data

function Team() {
	return (
		<div className="text-center">
			<div className="grid justify-center gap-32 px-2 xl:lg:grid-cols-2">
				{teamData.map((member, index) => (
					<MemberCard key={index} member={member} />
				))}
			</div>
		</div>
	);
}

export default Team;
