// quartz/components/HubLink.tsx
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const HubLink: QuartzComponent = () => {
  return (
    <div className="hub-link-container">
        <a href="https://media.yanbraga.com/" className="hub-link">
            <i className="fa-solid fa-dungeon"></i>
            <span>Retornar ao Hub</span>
        </a>
    </div>
  )
}

export default (() => HubLink) satisfies QuartzComponentConstructor