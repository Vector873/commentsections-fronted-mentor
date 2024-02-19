import Comments from "./Comments";
import { useState } from "react";
function App() {
  const [dataobj, setdataobj] = useState({
    currentUser: {
      image: "./src/assets/avatars/image-juliusomo.png",
      username: "juliusomo",
    },
    comments: [
      {
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 12,
        user: {
          image: "./src/assets/avatars/image-amyrobson.png",
          username: "amyrobson",
        },
        replies: [],
      },
      {
        id: 2,
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "2 weeks ago",
        score: 5,
        user: {
          image: "./src/assets/avatars/image-maxblagun.png",
          username: "maxblagun",
        },
        replies: [
          {
            id: 3,
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 4,
            replyingTo: "maxblagun",
            user: {
              image: "./src/assets/avatars/image-ramsesmiron.png",
              username: "ramsesmiron",
            },
          },
          {
            id: 4,
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            replyingTo: "ramsesmiron",
            user: {
              image: "./src/assets/avatars/image-juliusomo.png",
              username: "juliusomo",
            },
          },
        ],
      },
    ],
  });
  const [cmnt, setcmnt] = useState("");
  const [upcmnt, setupdcmnt] = useState("");
  const replysend = (c, pid) => {
    if (c == "") return;
    const { currentUser, comments } = dataobj;
    const newReply = {
      id: comments.map((c) => {
        if (c.id == pid) {
          return c.replies.length + 1;
        }
      }),
      content: c,
      createdAt: formatCreatedAt(new Date()),
      score: 12,
      replyingTo: comments.map((c) => {
        if (c.id == pid) {
          return c.user.username;
        }
      }),
      user: {
        image: "./src/assets/avatars/image-juliusomo.png",
        username: "juliusomo",
      },
    };
    const updatedComments = comments.map((c) => {
      if (c.id == pid) {
        const updatedReplies = [...c.replies, newReply];
        return {
          ...c,
          replies: updatedReplies,
        };
      }
      return c;
    });
    setdataobj({
      ...dataobj,
      comments: updatedComments,
    });
  };
  const send = () => {
    if (cmnt == "") return;
    const { currentUser, comments } = dataobj;
    const comment = {
      id: comments.length + 1,
      content: cmnt,
      createdAt: formatCreatedAt(new Date()),
      score: 12,
      user: {
        image: "./src/assets/avatars/image-juliusomo.png",
        username: "juliusomo",
      },
      replies: [],
    };
    const updatedComments = [...comments, comment];
    setdataobj({
      ...dataobj,
      comments: updatedComments,
    });
    setcmnt("");
  };
  const formatCreatedAt = (timestamp) => {
    const now = new Date();
    const secondsAgo = Math.floor((now - timestamp) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo} sec ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} min ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hours ago`;
    } else {
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(timestamp);
    }
  };
  const delcmnt = (id) => {
    const { currentUser, comments } = dataobj;
    const updatedata = comments.filter((c) => c.id !== id);
    setdataobj({
      ...dataobj,
      comments: updatedata,
    });
  };
  const delrep = (parentId, replyId) => {
    const { currentUser, comments } = dataobj;
    const updatedComments = comments.map((c) => {
      if (c.id === parentId) {
        const updatedReplies = c.replies.filter((r) => r.id !== replyId);
        return {
          ...c,
          replies: updatedReplies,
        };
      }
      return c;
    });
    setdataobj({
      ...dataobj,
      comments: updatedComments,
    });
  };
  const updatec = (id) => {
    const { currentUser, comments } = dataobj;
    const updatedata = comments.map((c) => {
      c.id === id ? (c.content = upcmnt) : c.content;
      return c;
    });
    setdataobj({
      ...dataobj,
      comments: updatedata,
    });
  };
  const updaterep = (pid, rid) => {
    const { currentUser, comments } = dataobj;
    const updatedComments = comments.map((c) => {
      if (c.id === pid) {
        const updatedReplies = c.replies.map((r) =>
          r.id === rid ? (r.content = upcmnt) : r.content
        );
        return {
          ...c,
          replies: updatedReplies,
        };
      }
      return c;
    });
    setdataobj({
      ...dataobj,
      comments: updatedComments,
    });
  };
  return (
    <div className="maindiv">
      {dataobj.comments &&
        dataobj.comments.map((c) => (
          <Comments
            c={c}
            key={c.id}
            delcmnt={delcmnt}
            delrep={delrep}
            replysend={replysend}
            updatec={updatec}
            updaterep={updaterep}
            upcmnt={upcmnt}
            setupdcmnt={setupdcmnt}
          />
        ))}
      <div className="cmntbox">
        <img src={dataobj.currentUser.image} alt="image not found" />
        <textarea
          placeholder="Add a comment..."
          onChange={(e) => setcmnt(e.target.value)}
          value={cmnt}
        />
        <button onClick={send}>SEND</button>
      </div>
    </div>
  );
}

export default App;
