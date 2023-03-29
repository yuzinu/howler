import React, {useEffect, useState} from 'react';
import HowlList from "./HowlList";

function Feed() {
  const [howls, setHowls] = useState([]);
  const [caption, setCaption] = useState("");

  useEffect (() => {
    fetch("http://localhost:5000/api/feed")
      .then(res => res.json())
      .then(data => {
          setHowls(data);
      })
      .catch(err => err);
  }, [howls]);

  const addHowl = async (e) => {
    e.preventDefault();
    try {
        const body = { caption: caption };
        const res = await fetch('http://localhost:5000/api/howl/createHowl',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );
        // const data = await res.json();
        setCaption("");
    } catch (err) {
        console.error(err.message);
    }
};

  return (
    <div>
        <h2 style={{ textAlign: 'start' }}>Feed</h2>
        <HowlList howls={howls} />
        <div className="mt-5">
            <h2>Add a howl</h2>
            <form onSubmit={addHowl}>
                <div>
                    <label htmlFor="caption" >Caption</label>
                    <br />
                    <textarea
                        id="caption"
                        name="caption"
                        onChange={(e) => {
                            setCaption(e.target.value);
                        }}
                        value={caption}
                    >
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary" value="Upload">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Feed;