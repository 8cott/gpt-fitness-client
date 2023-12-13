const Footer = () => {
    return (
      <div className="footer">
        <p>
          © {new Date().getFullYear()} Scott Rubin | Powered by <a href="https://openai.com" target="_blank" rel="noopener noreferrer">OpenAI's GPT-3.5-Turbo</a>
        </p>
      </div>
    );
  };
  
  export default Footer;
  