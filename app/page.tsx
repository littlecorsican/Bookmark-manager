import Client from "./components/Client";



export default function Home() {

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to Bookmark Manager</h2>
      {/* <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Bookmark 1</div>
        <div className="bg-white p-4 rounded shadow">Bookmark 2</div>
        <div className="bg-white p-4 rounded shadow">Bookmark 3</div>
      </div> */}
      <Client />

    </div>
  );
}
