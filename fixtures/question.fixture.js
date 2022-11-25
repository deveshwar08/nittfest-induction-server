const questions = [
    {
        "question": "Are you interested in MoCing ?",
        "domain_id": 4,
    },
    {
        "question": "Who would you like to see at "
        + "NITTFEST this year as a judge or guest?",
        "domain_id": 4,
    },
    {
        "question": "What ideas you have for promoting "
        + "NITTFEST other than sharing online posts?",
        "domain_id": 4,
    },
    {
        "question": "Ideate a few tagline suggestions",
        "domain_id": 4,
    },
    {
        "question": "Are you interested in MoCing? "
        + "(Yes/No/Interested in Trying) ",
        "domain_id": 4,
    },
    {
        "question": "What do you think are some exciting things we "
        + "can do to hype up the fest? ",
        "domain_id": 4,
    },
    {
        "question": "Write a short para (150 words) on how you "
        + "imagine the general atmosphere of the fest would be? ",
        "domain_id": 4,
    },
    {
        "question": "What do you think are the qualities of a good "
        + "Master of Ceremonies (Presenter/Host) of an event? ",
        "domain_id": 4,
    },
    {
        "question": "Give a clever and apt alternative title to "
        + "the Fest that captures the spirit of the competition "
        + "between the departments. ",
        "domain_id": 4,
    },
    {
        "question": "An imminent personality has come down as "
        + "a guest. How would you go about preparing "
        + "for an interview with them? ",
        "domain_id": 4,
    },
    {
        "question": "What are the clubs/teams you are part of? ",
        "domain_id": 2,
    },
    {
        "question": "What measures will you take before conducting an "
        + "offline event to ensure Covid19 protocols are "
        + "followed? (In detail ) ",
        "domain_id": 2,
    },
    {
        "question": "Were you part of the pre event? If yes, elaborate "
        + "on your contributions.",
        "domain_id": 2,
    },
    {
        "question": "How NOC differs from OC of other fests? ",
        "domain_id": 2,
    },
    {
        "question": "What perks can you gain by being part of NOC? ",
        "domain_id": 2,
    },
    {
        "question": "Who is better, Jack of All trades or Master of "
        + "One? State reasons to support your views.",
        "domain_id": 2,
    },
    {
        "question": "Explain NITTFEST using five words. ",
        "domain_id": 2,
    },
    {
        "question": "Why do you want to be part of OC? ",
        "domain_id": 2,
    },
    {
        "question": "What can you contribute to the team? ",
        "domain_id": 2,
    },
    {
        "question": "Suggest a theme for NITTFEST. ",
        "domain_id": 2,
    },
    {
        "question": "Who is better, Jack of all trades or Master "
        + "of One? State reason to support your views. ",
        "domain_id": 2,
    },
    {
        "question": "What do you bring to the marketing team that "
        + "makes you a valuable asset? (Word Limit: 100) ",
        "domain_id": 6,
    },
    {
        "question": "List the clubs and teams that you are "
        + "currently part of. ",
        "domain_id": 6,
    },
    {
        "question": "What do you expect to achieve by joining "
        + "NITTFest Marketing Team ? (Word Limit: 100) ",
        "domain_id": 6,
    },
    {
        "question": "Select a brand of your choice. Briefly "
        + "explain how you will market it. (Word Limit: 150) ",
        "domain_id": 6,
    },
    {
        "question": "How will you sell an umbrella with "
        + "holes to a person drenched in rain ? (Word Limit: 150) ",
        "domain_id": 6,
    },
    {
        "question": "If you were given the task of rebranding Starbucks "
        + "company for the Cryptocurrency industry, what would "
        + "the headline of the press release be? ",
        "domain_id": 6,
    },
    {
        "question": "Would you rather be able to see 10 minutes into your own "
        + "future or 10 minutes into the future of anyone but yourself?"
        + "Explain your choice. (Word Limit: 100) ",
        "domain_id": 6,
    },
    {
        "question": "What makes you a good marketing team member ?",
        "domain_id": 6,
    },
    {
        "question": "Write about a time where you worked with a "
        + "team to complete a task successfully. What were your "
        + "contributions ? (In 150 words) ",
        "domain_id": 6,
    },
    {
        "question": "Name few companies that you would like "
        + "to see at NITTFEST'22 ",
        "domain_id": 6,
    },
    {
        "question": "Give 5 creative ways to use a broken tree branch ",
        "domain_id": 6,
    },
    {
        "question": "What do you expect to achieve by joining NMT? ",
        "domain_id": 6,
    },
    {
        "question": "Tell about yourself in one sentence",
        "domain_id": 1,
    },
    {
        "question": "what are your Strengths and weaknesses?",
        "domain_id": 1,
    },
    {
        "question": "which quality of You think ,that will suit ambience work ",
        "domain_id": 1,
    },
    {
        "question": "Do you have any previous experience on Arts&crafts"
        + " ,if yes , explain in brief.",
        "domain_id": 1,
    },
    {
        "question": "Interesting quality or fact about u .",
        "domain_id": 1,
    },
    {
        "question": "On a scale of 10 , Rate your patience and hardwork respectively",
        "domain_id": 1,
    },
    {
        "question": "Which teams are you currently a part of?",
        "domain_id": 5,
    },
    {
        "question": "Why do you want to be a part of NITTFEST design team?",
        "domain_id": 5,
    },
    {
        "question": "Which design softwares are you familiar with?",
        "domain_id": 5,
    },
    {
        "question": "What made you choose NITTFEST Events as one of your preferences?",
        "domain_id": 3,
    },
    {
        "question": "State an instance wherein you thought on your feet"
        + " and made quick decisions.",
        "domain_id": 3,
    },
    {
        "question": "From the previous editions of NITTFEST, choose one "
        + "cluster and explain one or two events under it. ",
        "domain_id": 3,
    },
    {
        "question": "Assume you're in charge of an event taking place"
        + " on the CEESAT ground. "
        + "A bull enters the ring in the middle of the event. What will you do? ",
        "domain_id": 3,
    },
    {
        "question": "A time machine is given to you. You may only use "
        + "it for silly purposes. "
        + "What would be the craziest thing you could do with it?",
        "domain_id": 3,
    },
    {
        "question": "You accidently ate the sun for breakfast,"
        + "and now the entire world is blaming you,",
        "domain_id": 3,
    },
    {
        "question": "Why should we induct you into the team?",
        "domain_id": 3,
    },
    {
        "question": "What do you think NITTFEST is? ",
        "domain_id": 3,
    },
    {
        "question": "What made you choose NITTFEST Events "
        + "as one of your preferences? ",
        "domain_id": 3,
    },
    {
        "question": "State an instance wherein you thought on "
        + "your feet and made quick decisions. ",
        "domain_id": 3,
    },
    {
        "question": "Ideate an online event that we can have "
        + "during NITTFEST. ",
        "domain_id": 3,
    },
    {
        "question": "A time machine is given to you. You may "
        + "only use it for silly purposes. What would "
        + "be the craziest thing you could do with it? ",
        "domain_id": 3,
    },
    {
        "question": "Why should we induct you into the team? ",
        "domain_id": 3,
    },
];

module.exports = questions;
