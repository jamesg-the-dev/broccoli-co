import { brandName } from "./constants"

function Header() {
  return (
    <header data-testid="header">
      <nav>
        <a className='logo' href='/'>{brandName}</a>
      </nav>
    </header>
  )
}

export default Header