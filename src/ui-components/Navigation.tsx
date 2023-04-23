import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export type TNavLink = {
    name: string,
    url: string
}

export interface INavigation {
  navLinks: Array<TNavLink>
  isLoggedIn: boolean
}

function Navigation({navLinks, isLoggedIn = false} : INavigation){
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    function toggleMenu(){
        setShowMobileMenu(!showMobileMenu);
    }

    return (
        <Nav>
            <Logo>Logo</Logo>
            { isLoggedIn && 
                <>
                    <NavLinks>
                        {navLinks.map((link) => (
                            <NavLink key={link.name} to={link.url}>
                                {link.name}
                            </NavLink>
                        ))}
                    </NavLinks>
                    <HamburgerIcon onClick={toggleMenu}>
                        <div />
                        <div />
                        <div />
                    </HamburgerIcon>
                    {showMobileMenu && (
                        <MobileNav>
                            {navLinks.map((link) => (
                                <NavLink key={link.name} onClick={toggleMenu} to={link.url}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </MobileNav>
                    )}
                </>
            }
        </Nav>
    )
}

export { Navigation }


const Nav = styled.nav`
    display: flex;
    height: 4rem;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    background-color: #003E51;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
    color: #DE9034;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 2rem;
    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLink = styled(Link)`
    color: #FFFFFF;
    text-decoration: none;
    font-weight: 600;
    &:hover {
        color: #DE9034;
    }
`;

const HamburgerIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1.25rem;
    height: 1rem;
    cursor: pointer;
    & div {
        width: 100%;
        height: 0.125rem;
        background-color: #FFFFFF
    }
    @media (min-width: 769px) {
        display: none;
    }
`;

const MobileNav = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom:0; 
    top: 4rem;
    width:100%;
    height: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding-top: 2rem;
    background: rgba(0,62,81, 0.9);
    z-index: 2;
`;
