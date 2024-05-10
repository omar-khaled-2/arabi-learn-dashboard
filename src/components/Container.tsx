

const Container:React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ children,className = "" }) => {
    return <div className="flex flex-1 justify-center">
        <div className={`max-w-5xl px-5 flex flex-col flex-1 ${className}`} >
            {children}
        </div>
    </div>
}

export default Container