// quartz/components/PageTitle.tsx
import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg.pageTitle ?? "Untitled Quartz"
  const baseDir = pathToRoot(fileData.slug!)
  
  // Estilos inline para garantir a consistência
  const titleStyle: React.CSSProperties = {
    fontFamily: '"MedievalSharp", cursive',
    fontSize: '2.2rem',
    color: 'var(--primary)',
    margin: 0,
  }
  
  const subtitleStyle: React.CSSProperties = {
    fontFamily: '"Lora", serif',
    fontSize: '1rem',
    color: 'var(--text)',
    margin: 0,
    fontWeight: 300,
  }

  return (
    <div class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <h1 style={titleStyle}>DM Yan</h1>
        <h2 style={subtitleStyle}>Mestre Cronista</h2>
      </a>
    </div>
  )
}

PageTitle.css = `
.page-title {
  margin: 1rem 0;
}
.page-title a {
  text-decoration: none;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
