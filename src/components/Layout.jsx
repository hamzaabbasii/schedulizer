import PropTypes from "prop-types";
import Navbar from "./navbar/Navbar";
import BacktoTopButton from "./BacktoTopButton";

function Layout({ children }) {
	return (
		<div className="flex flex-col min-h-screen scroll-smooth">
			<Navbar />
			<div
				className="pattern-topography-indigo-500/10 pattern-topography-scale-[0.45] flex-grow bg-[#FAF8ED] bg-center bg-fixed scroll-smooth"
				// style={{ backgroundImage: "url('./images/parallax5.webp')" }}
			>
				{children}
				<BacktoTopButton />
			</div>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
