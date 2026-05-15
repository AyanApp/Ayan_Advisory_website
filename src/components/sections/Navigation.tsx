import logo from "../../assets/logo.png";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#ffffff] shadow-md px-8 py-4 flex items-center justify-between z-50">
      <img
        src={logo}
        alt="AYAN Healthcare"
        className="h-16 w-auto object-contain"
      />

      <div className="hidden md:flex gap-8 font-medium text-gray-700">
        <a href="#">Healthcare</a>
        <a href="#">Laboratory</a>
        <a href="#">Analytics</a>
        <a href="#">Contact</a>
      </div>

    </nav>
  );
}