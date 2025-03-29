import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ConfigForm from './components/ConfigForm'
import DynamicButton from './components/DynamicButton'
import logo from './assets/logo.png'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eef1f6;
`

const Logo = styled.img`
  height: 40px;
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  a {
    text-decoration: none;
    color: #344767;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #2563eb;
    }
  }
`

const PageContainer = styled.div`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
`

const PageTitle = styled.h1`
  color: #344767;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

const ConfigPage = () => {
  const handleSave = (config) => {
    localStorage.setItem('buttonConfig', JSON.stringify(config))
    alert('Configuration saved successfully!')
  }

  return (
    <PageContainer>
      <PageTitle>Configure Button</PageTitle>
      <ConfigForm onSave={handleSave} />
    </PageContainer>
  )
}

const OutputPage = () => {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const savedConfig = localStorage.getItem('buttonConfig')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  return (
    <PageContainer>
      <PageTitle>Button Output</PageTitle>
      <DynamicButton config={config} />
    </PageContainer>
  )
}

function App() {
  return (
    <Router>
      <Container>
        <Header>
          <Logo src={logo} alt="Humblx" />
          <Nav>
            <Link to="/">Config</Link>
            <Link to="/output">Output</Link>
          </Nav>
        </Header>
        <Routes>
          <Route path="/" element={<ConfigPage />} />
          <Route path="/output" element={<OutputPage />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
