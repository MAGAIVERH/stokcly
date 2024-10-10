import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "./_components/header";



export default function Home() {
  return (
    <div className="w-full space-y-8 m-8 rounded-lg p-8 bg-white">
        <Header>
          <HeaderLeft> 
            <HeaderSubtitle>Data Overview</HeaderSubtitle>
            <HeaderTitle>Dashboard</HeaderTitle>
          </HeaderLeft>
        </Header>
    </div>
  );
}
