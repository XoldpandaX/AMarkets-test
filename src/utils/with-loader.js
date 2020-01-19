export default function ({ func, loadingAffectAction }) {
  return async (context, ...rest) => {
    try {
      await context.dispatch(loadingAffectAction, { status: true }, { root: true });
      await func(context, ...rest);
    } catch (error) {
      console.error('withLoader', error);
    } finally {
      await context.dispatch(loadingAffectAction, { status: false }, { root: true });
    }
  };
}
