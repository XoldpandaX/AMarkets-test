import get from 'lodash.get';
import pick from 'lodash.pick';

const combineGenres = (genresArr = []) => (
  genresArr.length
    ? genresArr.reduce((acc, nextGenre) => (
      `${acc} ${nextGenre}`
    ), '')
    : ''
);

export function mapSchedule({ performances = [], sessions = [] }) {
  return performances.reduce((acc, nextPerformance) => {
    const relatedPerfSessions = sessions.filter((session) => {
      const sessionId = get(
        session,
        ['relationships', 'performance', 'data', 'id'],
        '',
      );

      return sessionId === nextPerformance.id ? session : null;
    });
    const { id, type, attributes: { title, genres } } = nextPerformance;

    return [
      ...acc,
      {
        id,
        type,
        title,
        genres: combineGenres(genres),
        sessions: relatedPerfSessions.map((session) => pick(session, ['id', 'attributes'])),
      },
    ];
  }, []);
}
