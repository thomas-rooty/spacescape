import styles from '@/styles/Sidebar.module.css'

const Sidebar = ({showSidebar}: { showSidebar: boolean }) => {
    return (
        <div className={`${styles.sidebar} ${showSidebar ? styles.show : styles.hide}`}>
            <h1 className={styles.title}>Spacescape <span className={styles.subtitle}>- a web experience</span></h1>
            <div className={styles.synopsis}>
                <h2 className={styles.synopsisTitle}>- What is Spacescape?</h2>
                <hr />
                <p>In the year 2300, Earth has succumbed to an environmental crisis, compelling humanity to venture into
                    the cosmos in search of a new sanctuary. Welcome to "Space Scape," a multiplayer survival adventure
                    where you are not just a spectator, but an active participant in this interstellar
                    odyssey.<br/><br/>

                    As a skilled astronaut, you find yourself stranded on a mysterious planet, a world away from the now
                    uninhabitable Earth. Your spacecraft, once a beacon of hope, lies in ruins, challenging you to
                    summon your inner resilience. Survival is your primary goal.<br/><br/>

                    In "Space Scape," every decision you make has profound implications. You must scavenge for
                    resources, harnessing the alien environment to sustain life. The elements here are unlike anything
                    known to humanity, demanding innovative strategies for water procurement, food cultivation, and
                    energy generation.<br/><br/>

                    This planet is teeming with enigmas and dangers, including unknown entities that lurk in the
                    shadows. Your survival skills will be tested against these alien creatures, and at times, even
                    against other survivors. Will you forge alliances or view every encounter as a potential threat?
                </p>
            </div>
        </div>
    )
}

export default Sidebar
