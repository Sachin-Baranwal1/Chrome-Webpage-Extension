document.addEventListener("DOMContentLoaded", function () {

    // CLOCK
    function updateClock() {
        const clock = document.getElementById("clock")
        if (clock) clock.innerText = new Date().toLocaleTimeString()
    }
    updateClock()
    setInterval(updateClock, 1000)

    // SEARCH BAR
    const searchBox = document.getElementById("searchBox")
    if (searchBox) {
        searchBox.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                const query = searchBox.value.trim()
                if (query) {
                    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query)
                }
            }
        })
    }

    // TODO LIST
    const todoInput = document.getElementById("todoInput")
    const todoList = document.getElementById("todoList")
    let todos = []
    try {
        todos = JSON.parse(localStorage.getItem("todos") || "[]")
        if (!Array.isArray(todos)) todos = []
        todos = todos
            .map((item) => {
                if (typeof item === "string") return { text: item, completed: false }
                if (item && typeof item.text === "string") {
                    return { text: item.text, completed: Boolean(item.completed) }
                }
                return null
            })
            .filter(Boolean)
    } catch {
        todos = []
    }

    function renderTodos() {
        if (!todoList) return
        todoList.innerHTML = ""
        if (todos.length === 0) {
            const empty = document.createElement("li")
            empty.className = "empty-state"
            empty.textContent = "No tasks yet. Add one above."
            todoList.appendChild(empty)
            return
        }
        todos.forEach((task, index) => {
            const li = document.createElement("li")
            if (task.completed) li.classList.add("completed")
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.checked = task.completed
            checkbox.addEventListener("change", function () {
                todos[index].completed = checkbox.checked
                saveTodos()
            })

            const text = document.createElement("span")
            text.textContent = task.text
            text.style.textDecoration = task.completed ? "line-through" : "none"
            text.style.opacity = task.completed ? "0.7" : "1"

            const removeBtn = document.createElement("button")
            removeBtn.type = "button"
            removeBtn.textContent = "Delete"
            removeBtn.addEventListener("click", function () {
                todos.splice(index, 1)
                saveTodos()
            })

            li.appendChild(checkbox)
            li.appendChild(text)
            li.appendChild(removeBtn)
            todoList.appendChild(li)
        })
    }

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos))
        renderTodos()
    }

    if (todoInput) {
        todoInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault()
                const value = todoInput.value.trim()
                if (value !== "") {
                    todos.unshift({ text: value, completed: false })
                    todoInput.value = ""
                    saveTodos()
                }
            }
        })
    }
    renderTodos()

    // NOTES SECTION
    const notesInput = document.getElementById("notesInput")
    const notesList = document.getElementById("notesList")
    let notes = []
    try {
        notes = JSON.parse(localStorage.getItem("notes") || "[]")
        if (!Array.isArray(notes)) notes = []
    } catch {
        notes = []
    }

    function renderNotes() {
        if (!notesList) return
        notesList.innerHTML = ""
        notes.forEach((note, index) => {
            const li = document.createElement("li")
            li.textContent = note
            li.addEventListener("click", () => {
                notes.splice(index, 1)
                saveNotes()
            })
            notesList.appendChild(li)
        })
    }

    function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes))
        renderNotes()
    }

    if (notesInput) {
        notesInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const value = notesInput.value.trim()
                if (value !== "") {
                    notes.push(value)
                    notesInput.value = ""
                    saveNotes()
                }
            }
        })
    }

    renderNotes()

    // BACKGROUND IMAGES
    const backgrounds = [
        "images/bg1.jpg", "images/bg2.jpg", "images/bg3.jpg", "images/bg4.jpg",
        "images/bg5.jpg", "images/bg6.jpg", "images/bg7.jpg", "images/bg8.jpg",
        "images/bg9.jpg", "images/bg10.jpg", "images/bg11.jpg", "images/bg12.jpg",
        "images/bg13.jpg", "images/bg14.jpg", "images/bg15.jpg", "images/bg16.jpg",
        "images/bg17.jpg", "images/bg18.jpg", "images/bg19.jpg", "images/bg20.jpg",
        "images/bg21.jpg", "images/bg22.jpg", "images/bg23.jpg", "images/bg24.jpg",
        "images/bg25.jpg", "images/bg26.jpg", "images/bg27.jpg", "images/bg28.jpg",
        "images/bg29.jpg", "images/bg30.jpg", "images/bg31.jpg", "images/bg32.jpg",
        "images/bg33.jpg", "images/bg34.jpg", "images/bg35.jpg", "images/bg36.jpg",
        "images/bg37.jpg", "images/bg38.jpg", "images/bg39.jpg", "images/bg40.jpg",
        "images/bg41.jpg", "images/bg42.jpg", "images/bg43.jpg", "images/bg44.jpg",
        "images/bg45.jpg", "images/bg46.jpg", "images/bg47.jpg", "images/bg48.jpg",
        "images/bg49.jpg", "images/bg50.jpg", "images/bg51.jpg", "images/bg52.jpg",
        "images/bg53.jpg", "images/bg54.jpg", "images/bg55.jpg", "images/bg56.jpg",
        "images/bg57.jpg", "images/bg58.jpg", "images/bg59.jpg", "images/bg60.jpg",
        "images/bg61.jpg", "images/bg62.jpg"
    ]

    function applyBackground(index) {
        document.body.style.backgroundImage = `url(${backgrounds[index]})`
        localStorage.setItem("bgIndex", String(index))
        localStorage.setItem("bgTime", String(Date.now()))
    }

    function setBackground() {
        const now = Date.now()
        const lastChange = Number(localStorage.getItem("bgTime"))
        let index = Number(localStorage.getItem("bgIndex"))
        if (Number.isNaN(index) || index < 0 || index >= backgrounds.length) index = 0

        if (Number.isNaN(lastChange) || (now - lastChange) > 12 * 60 * 60 * 1000) {
            index = (index + 1) % backgrounds.length
            applyBackground(index)
        } else {
            applyBackground(index)
        }
    }

    function refreshBackground() {
        let index = Number(localStorage.getItem("bgIndex"))
        if (Number.isNaN(index) || index < 0 || index >= backgrounds.length) index = 0

        let newIndex = index
        if (backgrounds.length > 1) {
            do {
                newIndex = Math.floor(Math.random() * backgrounds.length)
            } while (newIndex === index)
        }
        applyBackground(newIndex)
    }

    setBackground()

    const refreshBgBtn = document.getElementById("refreshBg")
    if (refreshBgBtn) {
        refreshBgBtn.addEventListener("click", refreshBackground)
    }

    const homePanel = document.getElementById("homePanel")
    const togglePanelBtn = document.getElementById("togglePanel")

    function setPanelOpen(open) {
        if (!homePanel || !togglePanelBtn) return
        homePanel.classList.toggle("is-hidden", !open)
        homePanel.hidden = !open
        togglePanelBtn.classList.toggle("is-active", open)
        togglePanelBtn.setAttribute("aria-expanded", open ? "true" : "false")
        togglePanelBtn.title = open ? "Hide clock and tasks" : "Show clock and tasks"
        localStorage.setItem("panelOpen", open ? "1" : "0")
    }

    setPanelOpen(localStorage.getItem("panelOpen") === "1")

    if (togglePanelBtn) {
        togglePanelBtn.addEventListener("click", function () {
            setPanelOpen(homePanel && homePanel.hidden)
        })
    }

    // TIMER
    const timerOverlay = document.getElementById("timerOverlay")
    const timerDisplay = document.getElementById("timerDisplay")
    const timerPreview = document.getElementById("timerPreview")
    const timerPauseBtn = document.getElementById("timerPause")
    const openTimerBtn = document.getElementById("openTimer")
    let timerElapsed = 0
    let timerRunning = false
    let timerStartedAt = 0
    let timerTick = null

    function pad(value) {
        return String(value).padStart(2, "0")
    }

    function formatElapsed(ms) {
        const total = Math.floor(ms / 1000)
        const hours = Math.floor(total / 3600)
        const minutes = Math.floor((total % 3600) / 60)
        const seconds = total % 60
        return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
    }

    function currentElapsed() {
        if (!timerRunning) return timerElapsed
        return timerElapsed + (Date.now() - timerStartedAt)
    }

    function renderTimer() {
        const text = formatElapsed(currentElapsed())
        if (timerDisplay) timerDisplay.textContent = text
        if (timerPreview) timerPreview.textContent = text
        if (timerPauseBtn) timerPauseBtn.textContent = timerRunning ? "Pause" : "Resume"
    }

    function setTimerOverlay(open) {
        if (!timerOverlay) return
        timerOverlay.classList.toggle("is-hidden", !open)
        timerOverlay.hidden = !open
        if (openTimerBtn) openTimerBtn.classList.toggle("is-active", open)
    }

    function startTimerTick() {
        if (timerTick) return
        timerTick = setInterval(renderTimer, 200)
    }

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true
            timerStartedAt = Date.now()
            startTimerTick()
        }
        setTimerOverlay(true)
        renderTimer()
    }

    function pauseTimer() {
        if (timerRunning) {
            timerElapsed = currentElapsed()
            timerRunning = false
            timerStartedAt = 0
        } else if (timerOverlay && !timerOverlay.hidden) {
            timerRunning = true
            timerStartedAt = Date.now()
            startTimerTick()
        }
        renderTimer()
    }

    function resetTimer() {
        timerRunning = false
        timerElapsed = 0
        timerStartedAt = 0
        if (timerTick) {
            clearInterval(timerTick)
            timerTick = null
        }
        renderTimer()
    }

    if (openTimerBtn) openTimerBtn.addEventListener("click", startTimer)
    const timerStartPanel = document.getElementById("timerStartPanel")
    if (timerStartPanel) timerStartPanel.addEventListener("click", startTimer)
    if (timerPauseBtn) timerPauseBtn.addEventListener("click", pauseTimer)
    const timerResetBtn = document.getElementById("timerReset")
    if (timerResetBtn) timerResetBtn.addEventListener("click", resetTimer)
    const timerExitBtn = document.getElementById("timerExit")
    if (timerExitBtn) {
        timerExitBtn.addEventListener("click", function () {
            setTimerOverlay(false)
        })
    }
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") setTimerOverlay(false)
    })
    renderTimer()

    // WEATHER
    async function getWeather() {
        try {
            const city = "Ghaziabad"
            const api = "8eb5c99b66b579e5b13d5f21a235c3ea"
            if (!api) return
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${encodeURIComponent(api)}`
            const res = await fetch(url)
            if (!res.ok) throw new Error(res.statusText)
            const data = await res.json()
            const weatherEl = document.getElementById("weather")
            if (weatherEl) weatherEl.innerText = `${city}: ${Math.round(data.main.temp)}°C, ${data.weather[0].main}`
        } catch (error) {
            console.log("Weather error", error)
            const weatherEl = document.getElementById("weather")
            if (weatherEl) weatherEl.innerText = "Weather unavailable"
        }
    }

    getWeather()
})